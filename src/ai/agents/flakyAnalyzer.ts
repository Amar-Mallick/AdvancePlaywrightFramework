export interface BuildSummary {
    runId: string;
    tests: Record<string, string>;
}

export interface FlakyResult {
    counts: { flaky: number; failing: number; total: number };
    flaky: string[];
    summary: string;
}

export async function analyzeFlaky(
    prev: BuildSummary,
    curr: BuildSummary,
    _hasApiKey: boolean,
): Promise<FlakyResult> {
    const allTitles = new Set([...Object.keys(prev.tests), ...Object.keys(curr.tests)]);
    const flaky: string[] = [];
    let failing = 0;

    for (const title of allTitles) {
        const prevStatus = prev.tests[title];
        const currStatus = curr.tests[title];
        if (prevStatus && currStatus && prevStatus !== currStatus) {
            flaky.push(title);
        }
        if (currStatus === 'failed' || currStatus === 'timedOut') {
            failing++;
        }
    }

    return {
        counts: { flaky: flaky.length, failing, total: allTitles.size },
        flaky,
        summary: '',
    };
}
