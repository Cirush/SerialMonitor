import { useState } from "react";
import { Typography, Box, Slider } from "@mui/material";

export function TrackBar({name}) {
    const [value, setValue] = useState(0);

    const handleOnChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <Box display={'flex'} 
            flexDirection={'column'} 
            justifyContent={'center'} 
            alignItems={'center'} 
            minWidth={'300px'} 
            boxShadow={3} 
            padding={3} 
            borderRadius={2}             
            >

            <Typography variant='body1'>
            {name}: {value}
            </Typography>
            <Slider
                aria-label={name}
                shiftStep={10}
                step={1}
                marks
                min={0}
                max={10}
                onChange={handleOnChange}
                />
        </Box>
    )
}