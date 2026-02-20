import { Category } from "@fitly/shared";

type FormValues = {
    title: string;
    userTitle: string;
    category: Category | "";
    type: string;
    seasons: string[];
}

export const defaultFormValues: FormValues = {
    title: '',
    userTitle: '',
    category: '',
    type: '',
    seasons: [],
};