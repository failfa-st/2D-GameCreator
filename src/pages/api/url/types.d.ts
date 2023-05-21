declare module "codesandbox-import-utils/lib/api/define" {
	interface IFiles {
		[key: string]: {
			content: string | Record<string, unknown>;
			isBinary: boolean;
		};
	}
}
