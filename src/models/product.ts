export default interface ProductDTO {
    promotionalPrice?: number | null
    regularPrice?: number | null
    startAt?: Date | null
    endAt?: Date | null
    companyId?: number
    title?: string | null
    subTitle?: string | null
    description?: string | null
    imageUrl?: string | null
}