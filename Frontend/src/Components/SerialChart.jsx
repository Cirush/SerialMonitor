import { Card, Typography } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';

export function SerialChart({Tile, xData, yData}) {
    
    const maxPoints = 300;

    return(
        <Card sx={{ flex: '1 0 calc(50% - 16px)', maxWidth: "500px", minWidth: "500px" }}>
            <Typography variant="h5" component="div">
            {Tile}
            </Typography>
            <LineChart skipAnimation={xData.length < maxPoints ? false : true}
            xData={[{ data: xData }]}
            series={[
                {
                    data: yData,
                    area: false,
                    showMark: false,
                    curve: "linear",
                },
            ]}
            width={500}
            height={300}
            />
        </Card>
    );
}