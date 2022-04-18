type taskProps = {
    [x: string]: any;
    id: string;
    description: string;
    complete: boolean;
    tag?: tagProps
    // size: Sizes.;
};

type tagProps = {
    [x: string]: any;
    id: string;
    name: string;
}

export enum Sizes {
    xs = "extra-small",
    sm = "small"
}


export type { taskProps, tagProps }