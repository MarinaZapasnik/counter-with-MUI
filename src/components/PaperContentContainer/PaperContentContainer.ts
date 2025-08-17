import styled from "@emotion/styled";
import { Paper } from "@mui/material";


export const PaperContentContainer = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px',
    gap: '30px',
    padding: '30px',
    backgroundColor: '#82ab6d',
    borderRadius: '20px'
})