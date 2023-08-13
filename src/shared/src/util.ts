
export function verifyIfNotANumber(param: string): number {
    const number = Number(param)

    if (!number) {
        throw new Error("Algum campo inválido!");
    }
    
    return number
}


export function verifyIfPastDate(day: number, month: number, year: number): void {
    const dateActual = new Date();
    const dayActual = dateActual.getDate();
    const monthActual = dateActual.getMonth() + 1;
    const yearActual = dateActual.getFullYear();

    if (year < yearActual || year == yearActual && month < monthActual || year == yearActual && month == monthActual && day < dayActual){
        throw new Error ("Informe uma data válida.");
    }
}

export function dateTreatment(date: string): Date {
    const dateAndHour = date.split("T");

    const hour = dateAndHour[1];

    //Date
    const smashDate = dateAndHour[0].split("-");

    const dateDay = smashDate[2];
    const dateMonth = smashDate[1];
    const dateYear = smashDate[0];

    const day = verifyIfNotANumber(dateDay);
    const month = verifyIfNotANumber(dateMonth);
    const year = verifyIfNotANumber(dateYear);

    if (day > 31 || month > 12) throw new Error("Informe uma data válida.");
    verifyIfPastDate(day, month, year);
    const dateConverted = new Date(`${dateYear}-${dateMonth}-${dateDay}T${hour}`);
    
    if (isNaN(dateConverted.getTime())) throw new Error("Informe uma data válida.");

    return dateConverted;
}
