package no.fd.archerystats.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import no.fd.archerystats.service.UserService;
import no.fd.archerystats.service.pojo.User;
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
    
    @Autowired
    private UserService userService;
    
    @ResponseBody
    @RequestMapping(value = "/request/users", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<User> getUsers(HttpServletResponse httpServletResponse) throws JsonProcessingException {
        return userService.getUsers();
    }

    @ResponseBody
    @RequestMapping(value = "/request/users/{user}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Map<String, Object> getUser(HttpServletResponse httpServletResponse, @PathVariable("user") String userId) throws JsonProcessingException {
        return userService.getUserInfo(userId);
    }
}
