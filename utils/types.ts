type taskProps = {
    [x: string]: any;
    id: string;
    description: string;
    complete: boolean;
    tag?: tagProps
};

type tagProps = {
    [x: string]: any;
    id: string;
    name: string;
}

export type { taskProps, tagProps }