
package no.fd.archerystats.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import no.fd.archerystats.service.ImportService;
import no.fd.archerystats.service.pojo.Round;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Kjetil
 */
@Controller
public class ImportController {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(StatisticsController.class);       
    
    @Autowired
    private ImportService importService;
    
    @ResponseBody
    @RequestMapping(value = "/request/rounds/import", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public void importData(HttpServletResponse httpServletResponse, @RequestBody(required = true) List<Round> rounds) throws JsonProcessingException {
        LOGGER.info("Import rounds");
        importService.importData(rounds);
    }    
    
}
