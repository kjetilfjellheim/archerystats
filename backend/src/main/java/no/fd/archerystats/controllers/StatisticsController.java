package no.fd.archerystats.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.Date;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import no.fd.archerystats.service.StatisticsService;
import no.fd.archerystats.service.pojo.User;
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
public class StatisticsController {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(StatisticsController.class);    

    @Autowired
    private StatisticsService statisticsService;    

    @ResponseBody
    @RequestMapping(value = "/request/statistics/verticaltotals", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Map<String, Integer> getVerticalTotals(HttpServletResponse httpServletResponse, HttpSession httpSession, @RequestParam(value="fromDate", defaultValue = "1970-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate, @RequestParam(value="toDate", defaultValue = "2099-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate, @RequestParam("mindistance") Integer mindistance, @RequestParam("maxdistance") Integer maxdistance) throws JsonProcessingException {
        LOGGER.info("Statistics vertical total");
        User user = (User)httpSession.getAttribute(LoginController.LOGIN_SESSION_NAME);        
        return statisticsService.getVerticalTotals(user.getId(), fromDate, toDate, mindistance, maxdistance);
    }    

    @ResponseBody
    @RequestMapping(value = "/request/statistics/horizontaltotals", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Map<String, Integer> getHorizontalTotals(HttpServletResponse httpServletResponse, HttpSession httpSession, @RequestParam(value="fromDate", defaultValue = "1970-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate, @RequestParam(value="toDate", defaultValue = "2099-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate, @RequestParam("mindistance") Integer mindistance, @RequestParam("maxdistance") Integer maxdistance) throws JsonProcessingException {
        LOGGER.info("Statistics horizontal total");
        User user = (User)httpSession.getAttribute(LoginController.LOGIN_SESSION_NAME);                
        return statisticsService.getHorizontalTotals(user.getId(), fromDate, toDate, mindistance, maxdistance);
    }    
        
    @ResponseBody
    @RequestMapping(value = "/request/statistics/overtime", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Map<Date, Map<String, Integer>> getByDate(HttpServletResponse httpServletResponse, @RequestParam(value="user") String userId, @RequestParam(value="bow", required = false) String bowId, @RequestParam(value="fromDate", defaultValue = "1970-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate, @RequestParam(value="toDate", defaultValue = "2099-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate, @RequestParam("distance") Integer distance) throws JsonProcessingException {
        LOGGER.info("Statistics bydate");        
        return statisticsService.getByDate(userId, bowId, fromDate, toDate, distance);
    }  
    
    @ResponseBody
    @RequestMapping(value = "/request/statistics/trainingminutes", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Map<Date, Integer> getTrainingMinutes(HttpServletResponse httpServletResponse, HttpSession httpSession, @RequestParam(value="fromDate", defaultValue = "1970-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate, @RequestParam(value="toDate", defaultValue = "2099-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate, @RequestParam(value="spt", required = false) Integer spt) throws JsonProcessingException {
        LOGGER.info("Statistics trainingminutes");
        User user = (User)httpSession.getAttribute(LoginController.LOGIN_SESSION_NAME);                        
        return statisticsService.getTrainingMinutes(user.getId(), fromDate, toDate, spt);
    }  
}
