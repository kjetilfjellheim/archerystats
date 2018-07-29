package no.fd.archerystats.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import no.fd.archerystats.service.DiaryService;
import no.fd.archerystats.service.pojo.Diary;
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
public class DiaryController {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(DiaryController.class);    

    @Autowired
    private DiaryService diaryService;    
    
    @ResponseBody
    @RequestMapping(value = "/request/diary/log", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Diary> getDiary(HttpServletResponse httpServletResponse, HttpSession httpSession, @RequestParam(value="fromDate", defaultValue = "1970-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate, @RequestParam(value="toDate", defaultValue = "2099-01-01") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate, @RequestParam(value="spt", required = false) Integer spt, @RequestParam(value="maxentries", required = false) Integer maxentries) throws JsonProcessingException {
        LOGGER.info("Diary log");  
        User user = (User)httpSession.getAttribute(LoginController.LOGIN_SESSION_NAME);                        
        return diaryService.getDiary(user.getId(), fromDate, toDate, spt, maxentries);
    }
    

}
