package no.fd.archerystats.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import no.fd.archerystats.service.UserService;
import no.fd.archerystats.service.pojo.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author kjetilf
 */
@Controller
public class UserController {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);       
    
    @Autowired
    private UserService userService;
    
    @ResponseBody
    @RequestMapping(value = "/request/users", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<User> getUsers(HttpServletResponse httpServletResponse) throws JsonProcessingException {
        LOGGER.info("Get users");
        return userService.getUsers();
    }

    @ResponseBody
    @RequestMapping(value = "/request/users/{user}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Map<String, Object> getUser(HttpServletResponse httpServletResponse, @PathVariable("user") String userId) throws JsonProcessingException {
        LOGGER.info("Get user info");
        return userService.getUserInfo(userId);
    }
}
