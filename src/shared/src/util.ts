
export function verifyIfNotANumber(param: string): number {
    const number = Number(param)

    if (!number) {
        throw new Error("Algum campo inválido!");
    }
    
    return number
}


export function verifyIfPastDate(day: number, month: number, year: number) {
    const dateActual = new Date();
    const dayActual = dateActual.getDate();
    const monthActual = dateActual.getMonth() + 1;
    const yearActual = dateActual.getFullYear();

    if (year < yearActual || year == yearActual && month < monthActual || year == yearActual && month == monthActual && day < dayActual){
        throw new Error ("Informe uma data válida.");
    }
}
