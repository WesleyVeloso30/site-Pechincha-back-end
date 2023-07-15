import AddressDTO from "./address";

export default interface CompanyDTO {
    id?: number;
    address?: AddressDTO;
    name?: string;
}