export const scheduleTask = async (run: Runnable, ms: number) => {
    await run.run0();

    return setInterval(async () => {
        await run.run0();
    }, ms);
}

export abstract class Runnable {
    public async run0(): Promise<void> {
        try {
            await this.run();
        } catch (e: any) {
            console.log(e.message);
        }
    }

    public abstract run(): Promise<void>;
}
