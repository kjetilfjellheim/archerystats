package no.fd.archerystats.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import no.fd.archerystats.service.DiaryService;
import no.fd.archerystats.service.pojo.Diary;
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
public class DiaryController {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(DiaryController.class);    

    @Autowired
    private DiaryService diaryService;    
    
    @ResponseBody
    @RequestMapping(value = "/request/diary/log", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Diary> getDiary(HttpServletResponse httpServletResponse, @RequestParam(value="user") String userId, @RequestParam(value="fromDate", defaultValue = "1970-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate, @RequestParam(value="toDate", defaultValue = "2099-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate, @RequestParam(value="spt", required = false) Integer spt) throws JsonProcessingException {
        LOGGER.info("Diary log");        
        return diaryService.getDiary(userId, fromDate, toDate, spt);
    }  
    
}
