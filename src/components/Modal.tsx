import ReactDOM from 'react-dom';
//import Panel from './Panel';
import { useEffect } from 'react';
import class_names from "classnames";

interface ModalProps{
    onChange: Function;
    children?: React.ReactNode;
    actionBar: React.ReactNode;
    xsmall?: boolean,
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    className?: string;
}

function Modal({onChange, children, actionBar, xsmall,  small, medium, large, className}: ModalProps){
    const onClose =() => {
        onChange();
    }  

    let strModalClassName = class_names({
        'top-40 left-96 h-72 w-96':xsmall,
        'inset-x-96 inset-y-60 ':small,
        'inset-x-60 inset-y-40 ':medium,
        'inset-x-40 inset-y-20 ':large}
    ,className
    ,"fixed p-5 bg-white overflow-auto border rounded-md border-slate-200");    

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);    

    return ReactDOM.createPortal(
        <div>
            <div onClick={onClose} className="fixed inset-0 bg-gray-200 opacity-70"></div>
            <div className={strModalClassName}>
                <div className="flex flex-col justify-between h-full">
                    <div>{children}</div>
                    <div className="flex justify-end">{actionBar}</div>
                </div>                                
            </div>
        </div>,
        document.querySelector('.modal_container')!
    );
}

export default Modal;