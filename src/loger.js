import i18n from 'i18next';

const errLog = document.querySelector('.feedback')
export default (typeLog)=>{
    errLog.classList.remove('text-success', 'text-warning', 'text-danger');
    switch (typeLog){
        case 'sending':
            errLog.classList.add('text-warning');
            errLog.textContent = i18n.t(`processState.${typeLog}`)
            break;
        case 'errorLoadAll':
            errLog.classList.add('text-warning');
            errLog.textContent = i18n.t(`processState.${typeLog}`)            
            break;
        case 'errorLoadOne':
            errLog.classList.add('text-warning');
            errLog.textContent = i18n.t(`processState.${typeLog}`)            
            break;
        case 'finished':
            errLog.classList.add('text-success');
            errLog.textContent = i18n.t(`processState.${typeLog}`)            
            break;
        case 'invalid':
        case 'dublication':
            errLog.classList.add('text-danger');            
            errLog.textContent = i18n.t(`error.${typeLog}`)
            break 

    }
    
        
}