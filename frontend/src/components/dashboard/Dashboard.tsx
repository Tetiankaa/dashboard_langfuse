import { Alert, Box, Card, CircularProgress, Typography } from "@mui/material";
import { legendClasses, pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";

import styles from "./dashboard.module.css";
import type {IPaginatedResponse, ITraceDetails, ISession, IQuery } from "../../interfaces";
import { traceService, sessionService } from "../../services";
import { EYearDropdown,EMonths } from "../../enums";
import { normalizeText,getDate } from "../../utils";

const Dashboard = () => {

    const [traces, setTraces] = useState<IPaginatedResponse<ITraceDetails>>(null);
    const [sessions, setSessions] = useState<IPaginatedResponse<ISession>>(null);

    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [selectedYear, setSelectedYear] = useState<EYearDropdown>(EYearDropdown.YEAR);
    const [selectedMonth, setSelectedMonth] = useState<EMonths>(EMonths.MONTH);

    const [openYearDropdown, setOpenYearDropdown] = useState<boolean>(false);
    const [openMonthDropdown, setOpenMonthDropdown] = useState<boolean>(false);

    const handleYearOpenChange = () => {
        setOpenYearDropdown(prevState => !prevState);
    }

    const handleMonthOpenChange = () => {
        setOpenMonthDropdown(prevState => !prevState);
    }

    const limit = 2000;
    const madeInteractions = traces && traces.totalItems;
    const remainingInteractions = limit - madeInteractions;

    const fetchData =  async (query?: IQuery) =>  {
        setPending(true);
        try {
            const { data: traces } = await traceService.getAll(query);
            setTraces(traces);

            const { data: sessions } = await sessionService.getAll(query);
            setSessions(sessions);

        } catch (err) {
            console.error('Fetch failed: ' + err);
            setError(true);
        } finally {
            setPending(false);
        }
    }

    useEffect(() => {
         fetchData();
    }, []);

    useEffect(() => {
        if (selectedYear !== EYearDropdown.YEAR && selectedMonth !== EMonths.MONTH) {
            const query = getDate(selectedYear, selectedMonth);
            fetchData(query);
        }
    }, [selectedMonth, selectedYear]);

    return (
                <div className={styles.container}>
                    {
                        pending ? (
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                                <CircularProgress />
                            </Box>
                        ) : error ? (
                            <Alert variant="filled" severity="error" sx={{mt: 1}}>
                                {'Something went wrong, please try again'}
                            </Alert>
                        ) : (
                            <>
                                <Box sx={{marginBottom: '5rem', display: 'flex', gap: '1rem'}}>
                                    <Dropdown open={openYearDropdown} onOpenChange={handleYearOpenChange}>
                                        <MenuButton>{selectedYear === EYearDropdown.YEAR ? normalizeText(selectedYear.toString()) : selectedYear}</MenuButton>
                                        <Menu>
                                            {
                                                Object.values(EYearDropdown).filter(val => !isNaN(Number(val))).map(val => (
                                                    <MenuItem key={val} onClick={() => setSelectedYear(val as EYearDropdown)}>{val}</MenuItem>
                                                ))
                                            }
                                        </Menu>
                                    </Dropdown>

                                    <Dropdown open={openMonthDropdown} onOpenChange={handleMonthOpenChange}>
                                        <MenuButton>{selectedMonth === EMonths.MONTH ? 'Month' : normalizeText(EMonths[selectedMonth])}</MenuButton>
                                        <Menu>
                                            {Object.entries(EMonths)
                                                .filter(([_, value]) => typeof value === 'number')
                                                .map(([key, value]) => (
                                                    <MenuItem key={value} onClick={() => setSelectedMonth(value as EMonths)}>
                                                        {normalizeText(key)}
                                                    </MenuItem>
                                                ))}
                                        </Menu>
                                    </Dropdown>
                                </Box>

                                <Card sx={{width: 250, textAlign: 'center', p: 2}}>
                                <Typography variant="h4"
                                            fontWeight="bold">{sessions && sessions.totalItems}</Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Conversations this month
                                </Typography>
                            </Card>

                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}
                                     flexDirection={'column'}
                                     marginTop={'5rem'}>
                                    <Typography variant="h5" fontWeight={600} marginBottom={'2rem'}>
                                        Number of interactions / remaining interactions (absolute values)
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight={600} marginBottom={'2rem'}>
                                        Limit: {limit} / month
                                    </Typography>

                                    <PieChart
                                        colors={['rgba(205, 92, 92, 0.84)', 'rgba(66,181,66,0.87)']}
                                        series={[
                                            {
                                                data: [
                                                    {id: 0, value: madeInteractions, label: 'Number of interactions',},
                                                    {
                                                        id: 1,
                                                        value: remainingInteractions,
                                                        label: 'Remaining interactions'
                                                    },
                                                ],
                                                arcLabel: (item) => `${item.value}`,
                                                arcLabelMinAngle: 35,
                                                arcLabelRadius: '60%',
                                            },
                                        ]}
                                        sx={{
                                            [`& .${pieArcLabelClasses.root}`]: {
                                                fontWeight: 'bold',
                                                fontSize: '1.4rem'
                                            }
                                        }}

                                        slotProps={{
                                            legend: {
                                                direction: 'vertical',
                                                sx: {
                                                    gap: '18px',
                                                    fontSize: '1rem',
                                                    [`.${legendClasses.mark}`]: {
                                                        height: 22,
                                                        width: 22,
                                                    },

                                                    ['.MuiChartsLegend-series']: {
                                                        gap: '10px',
                                                    },
                                                },
                                            },
                                        }}

                                        width={600}
                                        height={400}
                                    />
                                </Box></>
                        )
                    }
                </div>
    );
};

export {Dashboard};
