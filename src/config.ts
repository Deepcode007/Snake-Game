export interface AppConfig {
    canvasWidth: number;
    canvasHeight: number;
}

const DEFAULT_CONFIG: AppConfig = {
    canvasWidth: 600,
    canvasHeight: 600,
};

let appConfig: AppConfig = { ...DEFAULT_CONFIG };

const parseDimension = (value: unknown, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const getCanvasWidth = () => appConfig.canvasWidth;
export const getCanvasHeight = () => appConfig.canvasHeight;

export const loadConfig = async () => {
    try {
        const response = await fetch("./config.json", { cache: "no-store" });
        if (!response.ok) throw new Error(`Failed to load config: ${response.status}`);

        const rawConfig = (await response.json()) as Partial<AppConfig>;
        appConfig = {
            canvasWidth: parseDimension(rawConfig.canvasWidth, DEFAULT_CONFIG.canvasWidth),
            canvasHeight: parseDimension(rawConfig.canvasHeight, DEFAULT_CONFIG.canvasHeight),
        };
    } catch (error) {
        console.warn("Falling back to default config.", error);
        appConfig = { ...DEFAULT_CONFIG };
    }
};
