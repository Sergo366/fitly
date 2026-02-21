import { Category, Season } from "@fitly/shared";

export type FormValues = {
    title: string;
    userTitle: string;
    category: Category | "";
    type: string;
    seasons: Season[];
}

export const defaultFormValues: FormValues = {
    title: '',
    userTitle: '',
    category: '',
    type: '',
    seasons: [],
};