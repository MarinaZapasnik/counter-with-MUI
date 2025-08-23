import AddBoxIcon from '@mui/icons-material/AddBox';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsIcon from '@mui/icons-material/SettingsSuggest';
import { Button, ButtonGroup, CssBaseline, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useReducer} from "react";
import { getCountFromLocalStorage, getValuesFromLocalStorage, setCountToLocalStorage, setValuesToLocalStorage } from "../../utils/localStorageService";
import { CounterBox } from "../CounterBox/CounterBox";
import { PaperContainer } from "../PaperContainer/PaperContainer";
import { PaperContentContainer } from "../PaperContentContainer/PaperContentContainer";
import { valuesReducer } from '../../model/values-reducer';
import { countReducer, GetValuesAC, IncrementAC, ResetAС, SetCountAC, SetSettingsAC } from '../../model/count-reducer';

const  MIN_LIMIT_VALUE:number = 0 
const  MAX_LIMIT_VALUE:number = 500 
const  MIN_STEP_VALUE:number = 1 

export type ValuesProps = {
    minValue: number 
    maxValue: number
    stepValue: number 
}

type MessageProps = "enter values and press 'set'" | "incorrect value!" | null


export const Counter = () => {
    const [values, dispatchValues] = useReducer(valuesReducer, getValuesFromLocalStorage())
    const [count, dispatchCount] = useReducer(countReducer ,getCountFromLocalStorage());


    useEffect(() => {
        setCountToLocalStorage(count)
    }, [count])

    useEffect(() => {
        setValuesToLocalStorage(values.minValue, values.maxValue, values.stepValue)
    }, [values])
    
    const isIncorrectValues = useMemo(() => {
        return (
            values.minValue < MIN_LIMIT_VALUE ||
            values.maxValue > MAX_LIMIT_VALUE || 
            values.minValue >= values.maxValue ||
            values.stepValue < MIN_STEP_VALUE ||
            values.maxValue - values.minValue < values.stepValue
        ) 
            },[values]);

    const message: MessageProps = useMemo(() => {
        if (count !== null) return null;
        return isIncorrectValues
        ? "incorrect value!" 
        : "enter values and press 'set'" ;
    }, [count, isIncorrectValues])

    const isSetDisabled = useMemo(() => {
        return message !== 'enter values and press \'set\'';
    }, [message]);

    const isIncDisabled = useMemo(() => {
        return count === null || count >= values.maxValue || count+values.stepValue > values.maxValue 
        }, [count, values.maxValue, values.stepValue] )

    const isResetDisabled = useMemo(() => {
        return !!message || values.minValue === count
    }, [message, values.minValue, count])

    const isRedCount = useMemo(() => {
        if (count === null) return false;
        return count + values.stepValue > values.maxValue;  
    }, [count, values.stepValue, values.maxValue])

    const getValuesHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: 'minValue' | 'maxValue' | 'stepValue') => {
        dispatchCount(GetValuesAC(event, value))
        setCountToLocalStorage(null)
        //const newValue = Number(event.target.value)
        //const newValues = {...values, [value]: newValue}
        dispatchValues(GetValuesAC(event, value))
        //setValuesToLocalStorage(newValues.minValue, newValues.maxValue, newValues.stepValue)
    }    

    const setCountHandler = () => {
        if (!isIncorrectValues) {
            dispatchCount(SetCountAC(values.minValue))
            //setCountToLocalStorage(values.minValue)
        } 
    }

    const incrementHahdler = () => {
        if (typeof(count) === 'number') {
            const newCount = count + values.stepValue
            dispatchCount(IncrementAC(newCount)) 
            //setCountToLocalStorage(newCount)
        }
    }

    const resetHandler = () => {
        dispatchCount(ResetAС (values.minValue))
        //setCountToLocalStorage(values.minValue)
    }

    const setSettingsHandler = () => {
        dispatchCount(SetSettingsAC())       
    }

    return (
        <CssBaseline>
            <CounterBox>

            <PaperContainer>

                <PaperContentContainer >

                        <TextField
                            type='number'
                            label = { message === "incorrect value!" ? 'Incorrect value!' : 'Max value'}
                            value={values.maxValue}
                            error={message === "incorrect value!"}
                            onChange={(e) =>  getValuesHandler(e, 'maxValue')}
                            onClick={setSettingsHandler}
                                                        
                        />

                        <TextField
                            type='number'
                            label= { message === "incorrect value!" ? 'Incorrect value!' : 'Start value'}
                            value={values.minValue}
                            error={message === "incorrect value!"}
                            onChange={(event) =>  getValuesHandler(event, 'minValue')}
                            onClick={setSettingsHandler}
                            
                        />
                    
                        <TextField
                            type='number'
                            label= { message === "incorrect value!" ? 'Incorrect value!' : 'Step value'}
                            value={values.stepValue}
                            error={message === "incorrect value!"}
                            onChange={(event) =>  getValuesHandler(event, 'stepValue')}
                            onClick={setSettingsHandler}
                            
                        />
                    
                </PaperContentContainer>

                <PaperContentContainer>
                    <ButtonGroup>
                        <Button
                                size="small"
                                variant="contained"                
                                disabled={isSetDisabled}
                                onClick={setCountHandler}
                                
                                color={isSetDisabled ? "inherit" : "success"}>
                                <SettingsIcon
                                fontSize='large'>
                                </SettingsIcon>
                                SET
                        </Button> 
                    </ButtonGroup>

                </PaperContentContainer>
        
            </PaperContainer>        

            <PaperContainer>

                <PaperContentContainer  sx={{minHeight: '280px'}}>
                    {message !== null?
                        <Typography
                            color = {message === "incorrect value!" ? 'error' : 'info'}>
                            {message}
                        </Typography> :
                        <Typography
                            variant={isRedCount ? 'h1' : 'h2' }
                            color = {isRedCount ? 'error' : 'info'}>
                            {count}
                        </Typography>}
                </PaperContentContainer>

                <PaperContentContainer>
                    <ButtonGroup size="small" aria-label="Small button group" >
                        <Button
                            size="small"                
                            onClick={incrementHahdler}
                            disabled={isIncDisabled}
                            variant="contained"
                            color={isIncDisabled ? 'primary' : "success"}>
                            <AddBoxIcon
                                fontSize="large"
                                >                                
                            </AddBoxIcon>INC
                        </Button>
                        <Button
                            
                            size="small"                
                            variant="contained"
                            disabled={isResetDisabled}
                            onClick={resetHandler}
                            color={isResetDisabled ? 'primary' : "success"}>
                            <RestartAltIcon
                                fontSize="large"
                                >                                
                            </RestartAltIcon>RESET
                        </Button>
                    </ButtonGroup>
                    
                </PaperContentContainer>

            </PaperContainer>

        </CounterBox>
        </CssBaseline>
        
    
    );
};
