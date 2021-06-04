import React, {useState} from 'react';
import AnalyzesResultsItem from "./AnalyzesresultsItem/AnalyzesResultsItem";

const AnalyzesResults = ({results}) => {



    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = (index)=>{
        if (isOpen === index){
            return setIsOpen(null)
        }
        setIsOpen(index)
    }


    return (
        <div className={'row pt-5'}>
            <div className={'col-lg-12'}>
                {
                    results ? results.map((res, index)=>{
                        return (
                            <AnalyzesResultsItem callBack={()=>handleOpen(index)} isOpen={isOpen} res={res} index={index} key={res.id}/>
                        )
                    }) : ''
                }
            </div>
        </div>
    );
};




export default AnalyzesResults;