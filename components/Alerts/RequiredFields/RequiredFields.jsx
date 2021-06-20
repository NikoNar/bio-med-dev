import React from 'react';
import useTranslation from "next-translate/useTranslation";

const RequiredFields = ({errors}) => {
    const {t} = useTranslation()

    return (
        <div style={{display: Object.entries(errors).length > 0 ? 'block' : 'none'}}>
            <p style={{color: '#ff0000'}}>{t('errors:all_required_fields')}</p>
        </div>
    );
};

export default RequiredFields;