interface ImportMetaEnv extends Readonly<Record<string, string>> {
  MODE: 'production' | 'development';
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
