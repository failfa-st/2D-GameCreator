import { SyntheticEvent, useEffect, useRef, useState } from "react";

import axios, { AxiosError, AxiosError } from "axios";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CodeIcon from "@mui/icons-material/Code";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import EditIcon from "@mui/icons-material/Edit";
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
import { useHost } from "esdeka/react";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
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
	COMMAND_REMOVE_FEATURE,
	base,
} from "@/constants";
import { EditTitle } from "@/components/EditTitle";
import Link from "next/link";
import { fontMono } from "@/lib/theme";
import { Codesandbox } from "@/components/Codesandbox";
import { Codepen } from "@/components/Codepen";
import { InfoMenu } from "@/components/InfoMenu";
import SimpleSnackbar from "@/components/SimpleSnackbar";
import ExampleButton from "@/components/ExampleButton";
import { ListSubheader } from "@mui/material";
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

export interface ShareProps {
	title: string;
	content: string;
}

export default function Home() {
	const ref = useRef<HTMLIFrameElement>(null);
	const [prompt, setPrompt] = useState("");
	const [template, setTemplate] = useState(prettify(base.default));
	const [runningId, setRunningId] = useState("1");
	const [activeId, setActiveId] = useState("1");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [answers, setAnswers] = useAtom(answersAtom);
	const [showCode, setShowCode] = useAtom(showCodeAtom);
	const [loading, setLoading] = useState(false);
	const [loadingLive, setLoadingLive] = useState(true);
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const { mode, systemMode } = useColorScheme();

	const { call, subscribe } = useHost(ref, "2DGameGPT");

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

	const current = answers.find(({ id }) => id === activeId);

	const handleSnackbarClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setShowError(false);
	};

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
			<CssBaseline />
			<Stack
				sx={{
					...fontMono.style,
					position: "absolute",
					inset: 0,
					overflow: "hidden",
					flexDirection: { md: "row" },
					height: "100%",
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
							<Typography variant="h3" component="h1" sx={{ flex: 1, m: 0 }}>
								2D GameCreator-GPT
							</Typography>

							<IconButton
								color="inherit"
								aria-label={showCode ? "Hide Code" : "Show Code"}
								onClick={() => {
									setShowCode(previousState => !previousState);
								}}
							>
								{showCode ? <CodeOffIcon /> : <CodeIcon />}
							</IconButton>
							<IconButton
								edge="end"
								color="inherit"
								aria-label="Clear Prompt"
								onClick={async () => {
									setActiveId("1");
									setRunningId("1");
									setTemplate(prettify(base.default));
									reload();
								}}
							>
								<ClearIcon />
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
												? { ...previousAnswer, content: template }
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
							sx={{ p: 1, pt: 0 }}
							onSubmit={async event => {
								event.preventDefault();
								const formData = new FormData(event.target as HTMLFormElement);
								const formObject = Object.fromEntries(formData);
								try {
									setLoading(true);
									const { data } = await axios.post("/api/generate", formObject);
									const answer = data;
									setAnswers(previousAnswers => [answer, ...previousAnswers]);
									setRunningId(answer.id);
									setActiveId(answer.id);
									setTemplate(prettify(answer.content));
									reload();
								} catch (error) {
									setShowError(true);
									setErrorMessage((error as AxiosError).message);
									console.error(error);
								} finally {
									setLoading(false);
								}
							}}
						>
							<Paper variant="outlined" sx={{ p: 0 }}>
								<Stack sx={{ p: 2, gap: 2 }}>
									<Stack direction="row" spacing={1}>
										<TextField
											multiline
											fullWidth
											required
											id="prompt"
											name="prompt"
											label="Prompt"
											value={prompt}
											onChange={e => setPrompt(e.target.value)}
											minRows={5}
											InputProps={{
												style: fontMono.style,
											}}
										/>

										<Stack spacing={1}>
											<FormControl variant="outlined" sx={{ minWidth: 180 }}>
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
														create game
													</MenuItem>
													<MenuItem value={COMMAND_ADD_FEATURE}>
														add feature
													</MenuItem>
													<MenuItem value={COMMAND_REMOVE_FEATURE}>
														remove feature
													</MenuItem>
													<MenuItem value={COMMAND_EXTEND_FEATURE}>
														update feature
													</MenuItem>
													<MenuItem value={COMMAND_FIX_BUG}>
														fix bug
													</MenuItem>
												</Select>
											</FormControl>

											<Button
												form="gpt-form"
												type="submit"
												variant="contained"
												fullWidth
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
												sx={{ pl: 5, pr: 5, flexGrow: 1, overflow: "auto" }}
											>
												<Typography sx={{ fontWeight: "500" }}>
													Run
												</Typography>
											</Button>
										</Stack>
									</Stack>

									<Stack direction="row" spacing={1} alignItems="center">
										<Typography>Examples</Typography>

										<ExampleButton
											title={"Space Invaders"}
											text={"Retro Space Invaders"}
											onClick={setPrompt}
										/>

										<ExampleButton
											title="Jump & Run"
											text={
												"Jump & Run. Player collects coins to enter the next level. Various platform heights. Gras platform covers the whole ground. Space key for jumping, arrow keys for movement."
											}
											onClick={setPrompt}
										/>

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
							</Paper>

							<Paper variant="outlined" sx={{ mt: 2 }}>
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
										<Stack gap={2}>
											<TextField
												fullWidth
												multiline
												required={process.env.NODE_ENV === "production"}
												id="openAPIKey"
												name="openAPIKey"
												label="OpenAI API Key"
												minRows={1}
												InputProps={{
													style: fontMono.style,
												}}
											/>
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
										</Stack>
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
						</Box>

						<Paper variant="elevation" sx={{ p: 1, overflow: "auto" }}>
							<List sx={{ flex: 1, p: 0 }}>
								<ListSubheader
									sx={{ fontSize: "1em", fontWeight: "normal", color: "white" }}
								>
									Games
								</ListSubheader>
								{answers.map((answer, index) => {
									return (
										<ListItem
											key={answer.id}
											secondaryAction={
												<Stack sx={{ flexDirection: "row", gap: 1 }}>
													{answer.id === "1" ? undefined : (
														<IconButton
															edge="end"
															aria-label="Delete"
															onClick={() => {
																setAnswers(previousAnswers =>
																	previousAnswers.filter(
																		({ id }) => id !== answer.id
																	)
																);
																if (runningId === answer.id) {
																	const previous =
																		answers[index + 1];
																	if (previous) {
																		setActiveId(previous.id);
																		setRunningId(previous.id);
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
							{current && current.id !== "1" && (
								<>
									<Codepen title={current.task} content={current.content} />
									<Codesandbox title={current.task} content={current.content} />
								</>
							)}
							<Box sx={{ flex: 1 }} />

							<InfoMenu />

							<Link href="/" aria-label="home" style={{ color: "inherit" }}>
								<Box
									component="svg"
									viewBox="0 0 24 24"
									sx={{ fontSize: "2em", height: "1em", width: "1em" }}
								>
									<path
										fill="currentColor"
										d="m8,12c-.55,0-1-.45-1-1,0,0,0,0,0,0h-1v-1h4v1h-1s0,0,0,0c0,.55-.45,1-1,1Zm-4-2v4l.97,1.56-.02-4.03-.96-1.53Zm4,8h4v-1h-4v1Zm4,2v2s3,0,3,0l2.5-4h-4.3l-1.2,2Zm8-12v6l-1.28,2.05-4.33-.04.61-1.01h-3s0-13,0-13c7,0,8,6,8,6Zm-2,3l-2-2-2,2.01,2,1.99,2-2Zm-7,4h-1v1h1v-1Z"
									/>
								</Box>
							</Link>
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

			<SimpleSnackbar
				handleClose={handleSnackbarClose}
				showError={showError}
				message={errorMessage}
			/>
		</>
	);
}
