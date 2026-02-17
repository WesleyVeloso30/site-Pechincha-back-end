export default interface ProductDTO {
    promotionalPrice?: number | null;
    regularPrice?: number | null;
    startAt?: Date | null;
    endAt?: Date | null;
    companyId?: number;
    title?: string | null;
    subTitle?: string | null;
    description?: string | null;
    imageUrl?: string | null;
}

export interface ProductFilter {
    regularPrice?: number | null;
    startAt?: Date | null;
    endAt?: Date | null;
    companyId?: number;
    titles?: string[] | null;
    subTitle?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    promotionalPrice?: number | null;
    minimumPromotionalPrice?: number;
    maximumPromotionalPrice?: number;
}

export interface ProductTitles {
    id?: number;
    title?: string | null;
}