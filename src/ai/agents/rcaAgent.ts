export interface RcaVerdict {
    severity: string;
    priority: string;
    rootCause: string;
    fixes: string[];
}

interface FailureInput {
    title: string;
    file: string;
    error: string;
    stack?: string;
}

export async function analyzeFailure(input: FailureInput): Promise<RcaVerdict> {
    return {
        severity: 'medium',
        priority: 'P1',
        rootCause: input.error,
        fixes: ['Review the test and application code for the reported error.'],
    };
}
