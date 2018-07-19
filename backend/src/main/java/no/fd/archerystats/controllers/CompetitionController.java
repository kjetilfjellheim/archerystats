package no.fd.archerystats.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import no.fd.archerystats.service.CompetitionService;
import no.fd.archerystats.service.pojo.Competition;
import no.fd.archerystats.service.pojo.CompetitionParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author kjetilf
 */
@Controller
public class CompetitionController {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(CompetitionController.class);    

    @Autowired
    private CompetitionService competitionService;    

    @ResponseBody
    @RequestMapping(value = "/request/competitions/params", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<CompetitionParam> getTotals(HttpServletResponse httpServletResponse) throws JsonProcessingException {
        LOGGER.info("Get competition parameters");
        return competitionService.getCompetitionParams();
    }    
    
    @ResponseBody
    @RequestMapping(value = "/request/competitions/results/training", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Competition> getTrainingResults(HttpServletResponse httpServletResponse, @RequestParam(value="idUser") String idUser, @RequestParam(value="idParam") String idParam, @RequestParam(value="fromDate", defaultValue = "1970-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate, @RequestParam(value="toDate", defaultValue = "2099-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate) throws JsonProcessingException {
        LOGGER.info("Get training results");        
        return competitionService.getTrainingResults(idUser, idParam, fromDate, toDate);
    }  
    
    @ResponseBody
    @RequestMapping(value = "/request/competitions/results/competition", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Competition> getCompetitionResults(HttpServletResponse httpServletResponse, @RequestParam(value="idUser") String idUser, @RequestParam(value="idParam") String idParam, @RequestParam(value="fromDate", defaultValue = "1970-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate, @RequestParam(value="toDate", defaultValue = "2099-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate) throws JsonProcessingException {
        LOGGER.info("Get training competitions");        
        return competitionService.getCompetitionResults(idUser, idParam, fromDate, toDate);
    }  
}
