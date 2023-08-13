
export function verifyIfNotANumber(param: string): number {
    const number = Number(param)

    if (!number) {
        throw new Error("Algum campo inválido!");
    }
    
    return number
}


export function verifyIfPastDate(date: Date): void {
    const dateActual = new Date();

    if (date < dateActual){
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
    verifyIfNotANumber(dateYear);

    if (day > 31 || month > 12) throw new Error("Informe uma data válida.");

    const dateConverted = new Date(`${dateYear}-${dateMonth}-${dateDay}T${hour}`);
    
    if (isNaN(dateConverted.getTime())) throw new Error("Informe uma data válida.");

    return dateConverted;
}
