package no.fd.archerystats.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.Date;
import java.util.Map;
import java.util.TreeMap;
import javax.servlet.http.HttpServletResponse;
import no.fd.archerystats.service.StatisticsService;
import org.apache.commons.configuration.Configuration;
import static org.apache.commons.configuration.PropertyConverter.toDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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

    @Autowired
    private Configuration configuration;

    @Autowired
    private StatisticsService statisticsService;    

    @ResponseBody
    @RequestMapping(value = "/request/statistics/totals", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Map<String, Integer> getTotals(HttpServletResponse httpServletResponse, @RequestParam(value="user") String userId, @RequestParam(value="bow", required = false) String bowId, @RequestParam(value="fromDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate, @RequestParam(value="toDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate, @RequestParam("distance") Integer distance) throws JsonProcessingException {
        return statisticsService.getTotals(userId, bowId, fromDate, toDate, distance);
    }    
    
    @ResponseBody
    @RequestMapping(value = "/request/statistics/bydate", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Map<Date, Map<String, Integer>> getByDate(HttpServletResponse httpServletResponse, @RequestParam(value="user") String userId, @RequestParam(value="bow", required = false) String bowId, @RequestParam("distance") Integer distance) throws JsonProcessingException {
        return statisticsService.getByDate(userId, bowId, distance);
    }        
}
