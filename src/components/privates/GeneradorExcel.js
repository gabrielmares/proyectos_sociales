import FileSaver from 'file-saver';
import XLSX from 'xlsx'


const GeneradorExcel = (listaDeEventos) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    // funcion que retorna el documento a descargar
    const exportaExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(listaDeEventos);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = await XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, 'reporteAnual' + fileExtension);
    };
    return exportaExcel(listaDeEventos)
}

export default GeneradorExcel;