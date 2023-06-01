import { useEffect, useMemo, useRef, useState } from "react";

import axios, { AxiosError } from "axios";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CodeIcon from "@mui/icons-material/Code";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import MoneyIcon from "@mui/icons-material/Money";
import TollIcon from "@mui/icons-material/Toll";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { nanoid } from "nanoid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useHost } from "esdeka-node18/react";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import { useAtom } from "jotai";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useColorScheme } from "@mui/material/styles";
import { getTheme, prettify } from "@/utils";
import { answersAtom, showCodeAtom } from "@/store/atoms";
import {
	COMMAND_ADD_FEATURE,
	COMMAND_CREATE_GAME,
	COMMAND_EXTEND_FEATURE,
	COMMAND_FIX_BUG,
	COMMAND_LABEL_ADD_FEATURE,
	COMMAND_LABEL_CREATE_GAME,
	COMMAND_LABEL_EXTEND_FEATURE,
	COMMAND_LABEL_FIX_BUG,
	COMMAND_LABEL_REMOVE_FEATURE,
	COMMAND_REMOVE_FEATURE,
} from "@/constants";
import { baseGame } from "@/constants/baseGame";
import { fontMono } from "@/lib/theme";
import { Codesandbox } from "@/components/Codesandbox";
import ExampleButton from "@/components/base/ExampleButton";
import { Alert, ButtonGroup, ListSubheader } from "@mui/material";
import Secret from "@/components/base/secret";
import { toOpenAI } from "@/services/api";
import { createClient } from "@/services/api/openai";
import { RainbowListItemButton } from "./base/boxes";
import { CustomAxiosError } from "@/services/api/axios";
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

export interface ShareProps {
	title: string;
	content: string;
}

export default function GameCreator() {
	const ref = useRef<HTMLIFrameElement>(null);
	const abortController = useRef<AbortController | null>(null);

	const [prompt, setPrompt] = useState("");
	const [template, setTemplate] = useState(prettify(baseGame.default));
	const [runningId, setRunningId] = useState("1");
	const [activeId, setActiveId] = useState("1");
	const [answers, setAnswers] = useAtom(answersAtom);
	const [showCode, setShowCode] = useAtom(showCodeAtom);
	const [loading, setLoading] = useState(false);
	const [loadingLive, setLoadingLive] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	const { mode, systemMode } = useColorScheme();

	const { call, subscribe } = useHost(ref, "2DGameCreator");

	const connection = useRef(false);
	const [tries, setTries] = useState(1);

	// Send a connection request
	useEffect(() => {
		const current = answers.find(({ id }) => id === runningId);
		if (connection.current || tries <= 0) {
			return () => {
				/* Consistency */
			};
		}

		const timeout = setTimeout(() => {
			if (current) {
				call({ template: current.content });
			}

			setTries(tries - 1);
		}, 1_000);

		return () => {
			clearTimeout(timeout);
		};
	}, [call, tries, answers, runningId]);

	useEffect(() => {
		if (!connection.current && loadingLive) {
			const unsubscribe = subscribe(event => {
				const { action } = event.data;
				switch (action.type) {
					case "answer":
						connection.current = true;
						setLoadingLive(false);
						break;
					default:
						break;
				}
			});
			return () => {
				unsubscribe();
			};
		}
		return () => {
			/* Consistency */
		};
	}, [subscribe, loadingLive]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const formObject = Object.fromEntries(formData);
		try {
			setLoading(true);

			abortController.current = new AbortController();

			const { command, prompt, temperature, template, model, maxTokens } = formObject;

			const client = createClient(formObject.openAIAPIKey as string);
			const answer = await toOpenAI({
				command: command as string,
				prompt: prompt as string,
				temperature: temperature as string,
				template: template as string,
				model: model as string,
				maxTokens: maxTokens as string,
				client,
				signal: abortController.current.signal,
			});

			setAnswers(previousAnswers => [answer, ...previousAnswers]);
			setRunningId(answer.id);
			setActiveId(answer.id);
			setTemplate(prettify(answer.content));
			setErrorMessage("");
			reload();
		} catch (error) {
			const err = error as CustomAxiosError;
			console.error(err);

			let errorMessage = "";

			// If error is not canceled (from AbortController)
			if (err.message !== "canceled") {
				// If we have an error message from the data.error.message, use that
				if (err.data?.error?.message && err.data.error.message !== "") {
					errorMessage = err.data.error.message;
				}
				// If there's no message but there's a code, use the code
				else if (err.data?.error?.code) {
					errorMessage = err.data.error.code;
				}
				// If there's neither a message nor a code, use the error's own message
				else if (err.message) {
					errorMessage = err.message;
				} else {
					errorMessage = "UNKNOWN_ERROR";
				}
			}

			setErrorMessage(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	// const handleSubmitServer = async (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const formData = new FormData(event.target as HTMLFormElement);
	// 	const formObject = Object.fromEntries(formData);
	// 	try {
	// 		setLoading(true);

	// 		abortController.current = new AbortController();

	// 		const { data } = await axios.post("/api/generate", formObject, {
	// 			signal: abortController.current.signal,
	// 		});
	// 		const answer = data;

	// 		setAnswers(previousAnswers => [answer, ...previousAnswers]);
	// 		setRunningId(answer.id);
	// 		setActiveId(answer.id);
	// 		setTemplate(prettify(answer.content));
	// 		setErrorMessage("");
	// 		reload();
	// 	} catch (error) {
	// 		if ((error as { message?: string }).message !== "canceled") {
	// 			const err = error as AxiosError;
	// 			console.error(err);
	// 			setErrorMessage(err.response?.data?.message ?? err.message);
	// 		}
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	const handleCancel = async () => {
		if (abortController.current) {
			abortController.current.abort();
		}
		setLoading(false);
		reload();
	};

	const sortedAnswers = useMemo(() => {
		return [...answers].sort((a, b) => {
			if (a.id === "1") return -1;
			if (b.id === "1") return 1;
			return 0;
		});
	}, [answers]);

	const current = answers.find(({ id }) => id === activeId);

	function reload() {
		connection.current = false;
		if (ref.current) {
			ref.current.src = `/live?${nanoid()}`;
			setLoadingLive(true);
			setTries(1);
		}
	}

	return (
		<>
			<Paper sx={{ p: 1 }}>
				<Stack
					sx={{
						...fontMono.style,
						inset: 0,
						overflow: "hidden",
						flexDirection: { md: "row" },
						height: {
							md: "95vh",
						},
					}}
				>
					<Stack
						sx={{
							width: { md: "50%" },
							height: { xs: "50%", md: "100%" },
							flex: 1,
							overflow: "hidden",
						}}
					>
						<AppBar position="static" elevation={0} color="default">
							<Toolbar>
								<Stack sx={{ alignItems: "baseline", flex: 1 }} direction="row">
									<Typography variant="h5" component="h2" sx={{ m: 0 }}>
										2D GameCreator
									</Typography>

									<Typography variant="body2" sx={{ ml: 1 }}>
										{process.env.NEXT_PUBLIC_VERSION}
									</Typography>
								</Stack>

								<IconButton
									color="inherit"
									aria-label={showCode ? "Hide Code" : "Show Code"}
									onClick={() => {
										setShowCode(previousState => !previousState);
									}}
								>
									{showCode ? <CodeOffIcon /> : <CodeIcon />}
								</IconButton>
							</Toolbar>
						</AppBar>
						{showCode && (
							<Box
								sx={{ flex: 1 }}
								onKeyDown={event => {
									if (event.key === "s" && event.metaKey) {
										event.preventDefault();
										setAnswers(previousAnswers =>
											previousAnswers.map(previousAnswer => {
												return previousAnswer.id === activeId
													? {
															...previousAnswer,
															content: template,
													  }
													: previousAnswer;
											})
										);
										setTemplate(previousState => prettify(previousState));
										reload();
									}
								}}
							>
								<MonacoEditor
									theme={getTheme(mode, systemMode)}
									language="javascript"
									value={template}
									options={{
										fontSize: 14,
									}}
									onChange={async value => {
										setTemplate(value ?? "");
									}}
								/>
							</Box>
						)}
						<Stack
							sx={{
								flex: 1,
								display: showCode ? "none" : undefined,
								overflow: "hidden",
							}}
						>
							<Box
								component="form"
								id="gpt-form"
								sx={{ p: 0, pt: 0 }}
								onSubmit={handleSubmit}
							>
								<Stack sx={{ p: 1, pl: 0, gap: 1 }}>
									<Secret label="OpenAI API Key" name="openAIAPIKey" />

									<Stack direction="column" spacing={1}>
										<TextField
											multiline
											fullWidth
											variant="filled"
											required
											id="prompt"
											name="prompt"
											label="Prompt"
											value={prompt}
											onChange={e => setPrompt(e.target.value)}
											minRows={3}
											InputProps={{
												style: fontMono.style,
											}}
										/>

										<Stack
											spacing={1}
											direction="row"
											sx={{ justifyContent: "end" }}
										>
											<FormControl variant="outlined" sx={{ minWidth: 200 }}>
												<InputLabel id="gpt-command-select-label">
													Command
												</InputLabel>
												<Select
													labelId="gpt-command-select-label"
													id="gpt-command-select"
													name="command"
													defaultValue={COMMAND_CREATE_GAME}
													label="Command"
												>
													<MenuItem value={COMMAND_CREATE_GAME}>
														{COMMAND_LABEL_CREATE_GAME}
													</MenuItem>
													<MenuItem value={COMMAND_ADD_FEATURE}>
														{COMMAND_LABEL_ADD_FEATURE}
													</MenuItem>
													<MenuItem value={COMMAND_REMOVE_FEATURE}>
														{COMMAND_LABEL_REMOVE_FEATURE}
													</MenuItem>
													<MenuItem value={COMMAND_EXTEND_FEATURE}>
														{COMMAND_LABEL_EXTEND_FEATURE}
													</MenuItem>
													<MenuItem value={COMMAND_FIX_BUG}>
														{COMMAND_LABEL_FIX_BUG}
													</MenuItem>
												</Select>
											</FormControl>

											<ButtonGroup
												variant="contained"
												sx={{ maxHeight: "96px" }}
											>
												<Button
													form="gpt-form"
													type="submit"
													aria-label={loading ? "Loading" : "Run"}
													aria-disabled={loading}
													disabled={loading}
													startIcon={
														loading ? (
															<CircularProgress size={20} />
														) : (
															<PlayArrowIcon />
														)
													}
													sx={{
														pl: 5,
														pr: 5,
													}}
												>
													Run
												</Button>
												<Button
													aria-label="Cancel"
													aria-disabled={!loading}
													disabled={!loading}
													onClick={handleCancel}
													startIcon={<ClearIcon />}
													color="error"
													sx={{
														pl: 0,
														pr: 0,
													}}
												></Button>
											</ButtonGroup>
										</Stack>
									</Stack>

									{errorMessage && <Alert severity="error">{errorMessage}</Alert>}

									<Paper variant="outlined">
										<Accordion disableGutters square elevation={0}>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="gtp-options-content"
												id="gtp-options-header"
												sx={{
													bgcolor: "background.paper",
													color: "text.primary",
												}}
											>
												<Typography>Options</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<FormControl
													fullWidth
													variant="outlined"
													sx={{ mb: 3 }}
												>
													<InputLabel id="gpt-model-select-label">
														Model
													</InputLabel>
													<Select
														labelId="gpt-model-select-label"
														id="gpt-model-select"
														name="model"
														defaultValue="gpt-3.5-turbo"
														label="Model"
													>
														<MenuItem value="gpt-3.5-turbo">
															GPT 3.5 turbo
														</MenuItem>
														<MenuItem value="gpt-4">GPT 4</MenuItem>
													</Select>
												</FormControl>
												<Stack
													spacing={2}
													direction="row"
													sx={{ mb: 2 }}
													alignItems="center"
												>
													<AcUnitIcon />
													<Slider
														marks
														id="temperature"
														name="temperature"
														min={0}
														max={0.8}
														defaultValue={0.2}
														step={0.1}
														valueLabelDisplay="auto"
														aria-label="Temperature"
													/>
													<LocalFireDepartmentIcon />
												</Stack>
												<Stack
													spacing={2}
													direction="row"
													sx={{ mb: 2 }}
													alignItems="center"
												>
													<TollIcon />
													<Slider
														marks
														id="maxTokens"
														name="maxTokens"
														min={1024}
														max={4096}
														defaultValue={2048}
														step={256}
														valueLabelDisplay="auto"
														aria-label="Max Tokens"
													/>
													<MoneyIcon />
												</Stack>
												<input
													id="template"
													name="template"
													type="hidden"
													value={template}
													onChange={event => {
														setTemplate(event.target.value);
													}}
												/>
											</AccordionDetails>
										</Accordion>
									</Paper>

									<Stack direction="row" spacing={1} alignItems="center">
										<Typography>Examples</Typography>

										<ExampleButton
											title={"Space Invaders"}
											text={
												"Space Invaders. Single player ship at the bottom, a row of invaders at the top moving side-to-side and descending. The player ship can move left and right, and shoot bullets to destroy the invaders. Handle game over scenario when an invader reaches the player's level or all invaders are dead. Collision detection for both invaders and player. "
											}
											onClick={setPrompt}
										/>

										{/* <ExampleButton
											title="Jump & Run"
											text={
												"Jump & Run. Player collects coins to enter the next level. Various platform heights. Gras platform covers the whole ground. Space key for jumping, arrow keys for movement."
											}
											onClick={setPrompt}
										/> */}

										<ExampleButton
											title="Flappy Bird"
											text={
												"Flappy Bird. Intro screen, start the game by pressing space key. Bird starts flying on the left center of the screen. Gradually falls slowly. Pressing the space key over and over lets the bird fly higher. Pipes move from the right of the screen to the left. The pipes have a huge opening so that the bird can easily fly through. Collision detection when the bird hits the ground or a pipe. When collision detected, then show intro screen. Player gets a point for each passed pipe without an collision. Score is shown in the top left while bird is flying. High score on intro screen."
											}
											onClick={setPrompt}
										/>

										<ExampleButton
											title="Asteroids"
											text={
												"Asteroids. Control spaceship-movement using arrow keys. Fire bullets with space key to destroy asteroids, breaking them into smaller pieces. Earn points for destroying asteroids, with higher scores for smaller ones. Collision detection when spaceship hits asteroid, collision reduces spaceship health, game over when health is 0."
											}
											// text={
											// 	"Asteroids. Space ship can fly around in space using the arrow keys. Irregular shaped objects called asteroids flying around the space ship. The space ship can shoot bullets using the space key. When a bullet hits an asteroid, it splits in smaller irregular shaped objects; when asteroid is completely destroyed, the player scores one point. When the space ship collides with an asteroid, it looses 1 health; when the health is 0, the game is over. Restart the game via pressing space key."
											// }
											onClick={setPrompt}
										/>
									</Stack>
								</Stack>
							</Box>

							<Paper
								variant="elevation"
								sx={{ p: 1, pl: 0, pt: 0, overflow: "auto" }}
							>
								<List sx={{ flex: 1, p: 0 }}>
									<ListSubheader
										sx={{
											fontSize: "1em",
											fontWeight: "normal",
											color: "white",
										}}
									>
										Games
									</ListSubheader>
									{sortedAnswers.map((answer, index) => {
										return (
											<ListItem
												key={answer.id}
												secondaryAction={
													<Stack
														sx={{
															flexDirection: "row",
															gap: 1,
														}}
													>
														{answer.id === "1" ? undefined : (
															<IconButton
																edge="end"
																aria-label="Delete"
																onClick={() => {
																	setAnswers(previousAnswers =>
																		previousAnswers.filter(
																			({ id }) =>
																				id !== answer.id
																		)
																	);
																	if (runningId === answer.id) {
																		const previous =
																			answers[index + 1];
																		if (previous) {
																			setActiveId(
																				previous.id
																			);
																			setRunningId(
																				previous.id
																			);
																			setTemplate(
																				prettify(
																					previous.content
																				)
																			);
																			reload();
																		}
																	}
																}}
															>
																<DeleteForeverIcon />
															</IconButton>
														)}
													</Stack>
												}
												disablePadding
											>
												{activeId === answer.id ? (
													<RainbowListItemButton
														dense
														selected={activeId === answer.id}
														// disabled={activeId === answer.id}
														role={undefined}
														onClick={() => {
															setActiveId(answer.id);
															setRunningId(answer.id);
															setTemplate(prettify(answer.content));
															reload();
														}}
													>
														<ListItemIcon>
															{runningId === answer.id ? (
																<CheckIcon />
															) : (
																<VisibilityIcon />
															)}
														</ListItemIcon>

														<ListItemText
															primary={answer.task}
															primaryTypographyProps={{
																sx: {
																	overflow: "hidden",
																	textOverflow: "ellipsis",
																	whiteSpace: "nowrap",
																	fontSize: 16,
																},
															}}
														/>
													</RainbowListItemButton>
												) : (
													<ListItemButton
														dense
														selected={activeId === answer.id}
														// disabled={activeId === answer.id}
														role={undefined}
														onClick={() => {
															setActiveId(answer.id);
															setRunningId(answer.id);
															setTemplate(prettify(answer.content));
															reload();
														}}
													>
														<ListItemIcon>
															{runningId === answer.id ? (
																<CheckIcon />
															) : (
																<VisibilityIcon />
															)}
														</ListItemIcon>

														<ListItemText
															primary={answer.task}
															primaryTypographyProps={{
																sx: {
																	overflow: "hidden",
																	textOverflow: "ellipsis",
																	whiteSpace: "nowrap",
																	fontSize: 16,
																},
															}}
														/>
													</ListItemButton>
												)}
											</ListItem>
										);
									})}
								</List>
							</Paper>
						</Stack>
					</Stack>
					<Stack
						sx={{
							flex: 1,
							width: { md: "50%" },
							height: { xs: "50%", md: "auto" },
							position: "relative",
						}}
					>
						<AppBar position="static" elevation={0} color="default">
							<Toolbar>
								<Typography sx={{ mr: 2 }}>Game Preview</Typography>

								<IconButton
									edge="start"
									color="inherit"
									aria-label="Reload"
									onClick={() => {
										reload();
									}}
								>
									<ReplayIcon />
								</IconButton>

								<Box sx={{ flex: 1 }} />

								{current && current.id !== "1" && (
									<>
										<Typography>Share on</Typography>
										<Codesandbox
											title={current.task}
											content={current.content}
										/>
									</>
								)}
							</Toolbar>
						</AppBar>
						{loadingLive && (
							<Box
								sx={{
									position: "absolute",
									zIndex: 100,
									top: "50%",
									left: "50%",
									transform: "translate(-50%,-50%)",
								}}
							>
								<CircularProgress />
							</Box>
						)}
						<Box
							ref={ref}
							component="iframe"
							sx={{
								width: "100%",
								flex: 1,
								m: 0,
								border: 0,
								overflow: "hidden",
								visibility: loadingLive ? "hidden" : undefined,
							}}
							onLoad={() => {
								if (current) {
									setLoadingLive(true);
									setTries(1);
									connection.current = false;
									call({ template: current.content });
								}
							}}
							src="/live"
						/>
					</Stack>
				</Stack>
			</Paper>
		</>
	);
}
