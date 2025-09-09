
interface TableProps{
    data:{}[];
    config:{
        label:string;
        render?: Function;
        sortValue?: Function;
        customHeader?: string;        
    }[];
    customClass?:string;
}

function Table({data, config, customClass}: TableProps){
    const renderedHeader = config.map((item, index) => {
        let header = item.label;
        if(item.customHeader){header = item.customHeader;}
        return <th className="p-2" key={index}>{header}</th>
    });
    //console.log(data);
    let renderedRows = null;
    if(data && data.length > 0){
        renderedRows = data.map((item, itemIndex) => {
            const renderedCells = config.map((configItem, configIndex) => {
                return <td className="p-2" key={configIndex}>{configItem.render?.(item)}</td>;
            });
            return <tr className="border-b" key={itemIndex}>{renderedCells}</tr>
        });
    }

    return (
        <div>
            <table className={`table-auto border-spacing-2 ${customClass}`}>
                <thead>
                    <tr className="border-b-2">
                        {renderedHeader}
                    </tr>
                </thead>
                <tbody>
                    {renderedRows}
                </tbody>
            </table>            
        </div>);
}

export default Table;