import { Box, Card, Paper, Typography } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';

export function SerialChart({Tile, xData, yData}) {
    
    const maxPoints = 30;

    return(
        <Box display={'flex'} 
            justifyContent={'center'} 
            alignItems={'center'} 
            flexDirection={'column'}
            boxShadow={3}
            borderRadius={3}
            padding={1}
            >
            <Typography variant="body1">
            {Tile}
            </Typography>
            {                
            <LineChart skipAnimation={xData.length < maxPoints ? false : true}
            xData={[{ data: {xData} }]}
            series={[
                {
                    data: yData,
                    area: false,
                    showMark: false,
                    curve: "linear",
                },
            ]}
            width={300}
            height={300}
            />
            }
        </Box>
    );
}