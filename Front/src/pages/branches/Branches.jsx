import * as React from 'react';
import { useEffect } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from "@mui/material";

import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

import "./Branches.css";

const Branches = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div className="title-design">
                <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
                <h1 data-aos="flip-down" data-aos-duration="1000">הסניפים שלנו</h1>
                <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
            </div>


            <div className="branches">
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#C1121F" }} />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>טריאקי אשדוד</Typography>
                        <Typography sx={{ color: 'text.secondary', marginRight: 50 }}>
                            דרום
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="grid">
                            <Grid item xs={8} sx={{ marginTop: 3 }}>
                                הבנאים 4 א.ת אשדוד
                                <br />
                                08-8539797
                                <br />
                                <div className="kosher">  כשר בד״צ בית יוסף
                                </div>
                                <br />
                                <span className="opening-hours" >   שעות פתיחה
                                </span>
                                <br style={{ marginBottom: 3 }} />
                                ראשון - חמישי: 11:30-23:00
                                <br />
                                יום שישי: סגור
                                <br />
                                מוצ"ש:  חצי שעה מצאת שבת ועד השעה 00:00<br />
                            </Grid>
                            <Grid item xs={4} className="grid2">
                                <i className="fas fa-motorcycle"></i> &nbsp; משלוחים    <br />
                                <i className="fas fa-shopping-bag"></i>&nbsp; איסוף עצמי    <br />
                                <i className="fas fa-parking"></i>&nbsp; חניה  <br />
                                <i className="fas fa-utensils"></i> &nbsp; ישיבה במקום     <br />
                                <i className="fas fa-wheelchair"></i>&nbsp; גישה לנכים    <br />
                                <i className="fas fa-star-of-david"></i>&nbsp; כשר למהדרין <br />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#C1121F" }} />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>טריאקי באר שבע</Typography>
                        <Typography sx={{ color: 'text.secondary', marginRight: 50 }}>
                            דרום
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="grid">
                            <Grid item xs={8} sx={{ marginTop: 2 }}>
                                חיל הנדסה 1 מרכז ביג באר שבע
                                <br />
                                08-9922334                                <br />
                                <div className="kosher">  כשר בד״צ בית יוסף
                                </div>
                                <br />
                                <span className="opening-hours" >   שעות פתיחה
                                </span>
                                <br style={{ marginBottom: 3 }} />
                                ראשון - חמישי: 11:00-23:30
                                <br />
                                יום שישי: סגור
                                <br />
                                מוצ"ש:  חצי שעה מצאת שבת ועד השעה 00:00<br />
                                <br />
                                אירועים: בחורף 25 סועדים/בקיץ 48 סועדים

                            </Grid>
                            <Grid item xs={4} className="grid2">
                                <i className="fas fa-motorcycle"></i> &nbsp; משלוחים    <br />
                                <i className="fas fa-shopping-bag"></i>&nbsp; איסוף עצמי    <br />
                                <i className="fas fa-parking"></i>&nbsp; חניה  <br />
                                <i className="fas fa-utensils"></i> &nbsp; ישיבה במקום     <br />
                                <i className="fas fa-wheelchair"></i>&nbsp; גישה לנכים    <br />
                                <i className="fas fa-star-of-david"></i>&nbsp; כשר למהדרין <br />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>

            <div className="branches" style={{ marginTop: 15, marginBottom: 15 }}>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#C1121F" }} />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>טריאקי רמת גן</Typography>
                        <Typography sx={{ color: 'text.secondary', marginRight: 50 }}>
                            מרכז
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="grid">
                            <Grid item xs={8} sx={{ marginTop: 2 }}>
                                בן גוריון 13 בני ברק/רמת גן
                                <br />
                                077-7000333
                                <br />
                                <div className="kosher">  כשר בד״צ בית יוסף
                                </div>
                                <br />
                                <span className="opening-hours" >   שעות פתיחה
                                </span>
                                <br style={{ marginBottom: 3 }} />
                                ראשון - חמישי: 11:00-23:30
                                <br />
                                יום שישי: סגור
                                <br />
                                מוצ"ש:  חצי שעה מצאת שבת ועד השעה 00:00<br />
                                <br />
                                אירועים: בחורף 25 סועדים/בקיץ 48 סועדים

                            </Grid>
                            <Grid item xs={4} className="grid2">
                                <i className="fas fa-motorcycle"></i> &nbsp; משלוחים    <br />
                                <i className="fas fa-shopping-bag"></i>&nbsp; איסוף עצמי    <br />
                                <i className="fas fa-parking"></i>&nbsp; חניה  <br />
                                <i className="fas fa-utensils"></i> &nbsp; ישיבה במקום     <br />
                                <i className="fas fa-wheelchair"></i>&nbsp; גישה לנכים    <br />
                                <i className="fas fa-star-of-david"></i>&nbsp; כשר למהדרין <br />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#C1121F" }} />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>טריאקי צומת הפיל ת"א</Typography>
                        <Typography sx={{ color: 'text.secondary', marginRight: 50 }}>
                            מרכז
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="grid">
                            <Grid item xs={8} sx={{ marginTop: 3 }}>
                                בני אפריים 280, תל אביב
                                <br />
                                053-321-3626
                                <br />
                                <div className="kosher">  כשר בד״צ בית יוסף
                                </div>
                                <br />
                                <span className="opening-hours" >   שעות פתיחה
                                </span>
                                <br style={{ marginBottom: 3 }} />
                                ראשון - חמישי: 11:30-23:00
                                <br />
                                יום שישי: סגור
                                <br />
                                מוצ"ש:  חצי שעה מצאת שבת ועד השעה 00:00<br />
                            </Grid>
                            <Grid item xs={4} className="grid2">
                                <i className="fas fa-motorcycle"></i> &nbsp; משלוחים    <br />
                                <i className="fas fa-shopping-bag"></i>&nbsp; איסוף עצמי    <br />
                                <i className="fas fa-parking"></i>&nbsp; חניה  <br />
                                <i className="fas fa-utensils"></i> &nbsp; ישיבה במקום     <br />
                                <i className="fas fa-wheelchair"></i>&nbsp; גישה לנכים    <br />
                                <i className="fas fa-star-of-david"></i>&nbsp; כשר למהדרין <br />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#C1121F" }} />}
                        aria-controls="panel5bh-content"
                        id="panel5bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>טריאקי אקספרס לוד</Typography>
                        <Typography sx={{ color: 'text.secondary', marginRight: 50 }}>
                            מרכז
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="grid">
                            <Grid item xs={8} sx={{ marginTop: 3 }}>
                                הנשיא 3,לוד
                                <br />
                                077-7000333
                                <br />
                                <div className="kosher">  כשר בד״צ בית יוסף
                                </div>
                                <br />
                                <span className="opening-hours" >   שעות פתיחה
                                </span>
                                <br style={{ marginBottom: 3 }} />
                                ראשון - חמישי: 11:30-23:30                                <br />
                                יום שישי: סגור
                                <br />
                                מוצ"ש:  חצי שעה מצאת שבת ועד השעה 00:00<br />
                            </Grid>
                            <Grid item xs={4} className="grid2">
                                <i className="fas fa-motorcycle"></i> &nbsp; משלוחים    <br />
                                <i className="fas fa-shopping-bag"></i>&nbsp; איסוף עצמי    <br />
                                <i className="fas fa-parking"></i>&nbsp; חניה  <br />
                                <i className="fas fa-utensils"></i> &nbsp; ישיבה במקום     <br />
                                <i className="fas fa-wheelchair"></i>&nbsp; גישה לנכים    <br />
                                <i className="fas fa-star-of-david"></i>&nbsp; כשר למהדרין <br />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#C1121F" }} />}
                        aria-controls="panel6bh-content"
                        id="panel6bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>טריאקי ראש העין</Typography>
                        <Typography sx={{ color: 'text.secondary', marginRight: 50 }}>
                            מרכז
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="grid">
                            <Grid item xs={8} sx={{ marginTop: 3 }}>
                                העמל 13,ראש העין
                                <br />
                                077-7000333
                                <br />
                                <div className="kosher">  כשר בד״צ בית יוסף
                                </div>
                                <br />
                                <span className="opening-hours" >   שעות פתיחה
                                </span>
                                <br style={{ marginBottom: 3 }} />
                                ראשון- רביעי: 11:30-22:30
                                <br />
                                חמישי: 11:30-23:30
                                <br />
                                יום שישי: 11:30-14:00
                                <br />
                                מוצ"ש:  חצי שעה מצאת שבת ועד השעה 00:00<br />
                                <br />
                                אירועים: עד 80 סועדים

                            </Grid>
                            <Grid item xs={4} className="grid2">
                                <i className="fas fa-motorcycle"></i> &nbsp; משלוחים    <br />
                                <i className="fas fa-shopping-bag"></i>&nbsp; איסוף עצמי    <br />
                                <i className="fas fa-parking"></i>&nbsp; חניה  <br />
                                <i className="fas fa-utensils"></i> &nbsp; ישיבה במקום     <br />
                                <i className="fas fa-wheelchair"></i>&nbsp; גישה לנכים    <br />
                                <i className="fas fa-star-of-david"></i>&nbsp; כשר למהדרין <br />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>

            <div className="branches">
                <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#C1121F" }} />}
                        aria-controls="panel7bh-content"
                        id="panel7bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>טריאקי כפר סבא</Typography>
                        <Typography sx={{ color: 'text.secondary', marginRight: 50 }}>
                            שרון
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="grid">
                            <Grid item xs={8} sx={{ marginTop: 2 }}>
                                התע"ש 14, כפר סבא
                                <br />
                                077-7000333
                                <br />
                                <div className="kosher">  כשר בד״צ בית יוסף - סניף כשר לפסח</div>
                                <br />
                                <span className="opening-hours" >   שעות פתיחה
                                </span>
                                <br style={{ marginBottom: 3 }} />
                                ראשון - רביעי: 11:00-23:00
                                <br />
                                חמישי: 11:30-23:30
                                <br />
                                יום שישי: 11:00-14:00
                                <br />

                                מוצ"ש:  חצי שעה מצאת שבת ועד השעה 00:00<br />
                                <br />

                                אירועים: עד 50 סועדים

                            </Grid>
                            <Grid item xs={4} className="grid2">
                                <i className="fas fa-motorcycle"></i> &nbsp; משלוחים    <br />
                                <i className="fas fa-shopping-bag"></i>&nbsp; איסוף עצמי    <br />
                                <i className="fas fa-parking"></i>&nbsp; חניה  <br />
                                <i className="fas fa-utensils"></i> &nbsp; ישיבה במקום     <br />
                                <i className="fas fa-wheelchair"></i>&nbsp; גישה לנכים    <br />
                                <i className="fas fa-star-of-david"></i>&nbsp; כשר למהדרין <br />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#C1121F" }} />}
                        aria-controls="panel8bh-content"
                        id="panel8bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>טריאקי נתניה</Typography>
                        <Typography sx={{ color: 'text.secondary', marginRight: 50 }}>
                            שרון
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="grid">
                            <Grid item xs={8} sx={{ marginTop: 3 }}>
                                מפי 5, נתניה
                                <br />
                                09-893-2989
                                <br />
                                <div className="kosher">  כשר בד״צ בית יוסף
                                </div>
                                <br />
                                <span className="opening-hours" >   שעות פתיחה
                                </span>
                                <br style={{ marginBottom: 3 }} />
                                ראשון - חמישי: 12:00-22:00
                                <br />
                                יום שישי: סגור
                                <br />
                                מוצ"ש: 21:00-23:00
                                <br />
                            </Grid>
                            <Grid item xs={4} className="grid2">
                                <i className="fas fa-motorcycle"></i> &nbsp; משלוחים    <br />
                                <i className="fas fa-shopping-bag"></i>&nbsp; איסוף עצמי    <br />
                                <i className="fas fa-parking"></i>&nbsp; חניה  <br />
                                <i className="fas fa-utensils"></i> &nbsp; ישיבה במקום     <br />
                                <i className="fas fa-wheelchair"></i>&nbsp; גישה לנכים    <br />
                                <i className="fas fa-star-of-david"></i>&nbsp; כשר למהדרין <br />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>

            <div className="branches" style={{ marginTop: 15, marginBottom: 50 }}>
                <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#C1121F" }} />}
                        aria-controls="panel9bh-content"
                        id="panel9bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>טריאקי עפולה</Typography>
                        <Typography sx={{ color: 'text.secondary', marginRight: 50 }}>
                            צפון
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="grid">
                            <Grid item xs={8} sx={{ marginTop: 2 }}>
                                יהושע חנקין 14, קניון העמקים, עפולה
                                <br />
                                077-7000333
                                <br />
                                <div className="kosher">  כשר בד״צ בית יוסף - סניף כשר לפסח</div>
                                <br />
                                <span className="opening-hours" >   שעות פתיחה
                                </span>
                                <br style={{ marginBottom: 3 }} />
                                ראשון - חמישי: 11:00-23:30
                                <br />
                                יום שישי: 11:00-15:00
                                <br />
                                מוצ"ש:  חצי שעה מצאת שבת ועד השעה 00:00<br />
                                <br />
                                אירועים: עד 100 סועדים

                            </Grid>
                            <Grid item xs={4} className="grid2">
                                <i className="fas fa-motorcycle"></i> &nbsp; משלוחים    <br />
                                <i className="fas fa-shopping-bag"></i>&nbsp; איסוף עצמי    <br />
                                <i className="fas fa-parking"></i>&nbsp; חניה  <br />
                                <i className="fas fa-utensils"></i> &nbsp; ישיבה במקום     <br />
                                <i className="fas fa-wheelchair"></i>&nbsp; גישה לנכים    <br />
                                <i className="fas fa-star-of-david"></i>&nbsp; כשר למהדרין <br />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#C1121F" }} />}
                        aria-controls="panel10bh-content"
                        id="panel10bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>טריאקי קרית אתא</Typography>
                        <Typography sx={{ color: 'text.secondary', marginRight: 50 }}>
                            צפון
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="grid">
                            <Grid item xs={8} sx={{ marginTop: 3 }}>
                                העצמאות 59, קריית אתא
                                <br />
                                04-8535070
                                <br />
                                <div className="kosher">  כשר בד״צ בית יוסף
                                </div>
                                <br />
                                <span className="opening-hours" >   שעות פתיחה
                                </span>
                                <br style={{ marginBottom: 3 }} />
                                ראשון - חמישי: 11:00-23:00
                                <br />
                                יום שישי: סגור
                                <br />
                                מוצ"ש:  45 דקות מצאת שבת ועד השעה 00:00<br />
                            </Grid>
                            <Grid item xs={4} className="grid2">
                                <i className="fas fa-motorcycle"></i> &nbsp; משלוחים    <br />
                                <i className="fas fa-shopping-bag"></i>&nbsp; איסוף עצמי    <br />
                                <i className="fas fa-parking"></i>&nbsp; חניה  <br />
                                <i className="fas fa-utensils"></i> &nbsp; ישיבה במקום     <br />
                                <i className="fas fa-wheelchair"></i>&nbsp; גישה לנכים    <br />
                                <i className="fas fa-star-of-david"></i>&nbsp; כשר למהדרין <br />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div >
    );
}

export default Branches;