package no.fd.archerystats.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import no.fd.archerystats.service.LoginService;
import no.fd.archerystats.service.pojo.User;
import no.fd.archerystats.service.pojo.facebook.Profile;
import no.fd.archerystats.service.pojo.facebook.SocialToken;
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
public class LoginController {

    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);

    public static final String LOGIN_SESSION_NAME = "LOGIN_INFO";
    
    private static final int MAX_INACTIVE_TIME = 1000 * 60 * 30;
    
    @Autowired
    private LoginService loginService;
    
    @ResponseBody    
    @RequestMapping(value = "/request/facebook/login", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public boolean loginFacebook(HttpServletResponse httpServletResponse, HttpSession httpSession, @RequestBody(required = true) SocialToken socialToken) throws JsonProcessingException {
        LOGGER.info("Facebook login.");
        User user = loginService.login(socialToken);
        if (user != null) {
            httpSession.setAttribute(LOGIN_SESSION_NAME, user);
            httpSession.setMaxInactiveInterval(MAX_INACTIVE_TIME);            
        } else {
            httpSession.invalidate();
        }
        return user != null;
    }  
    
    @ResponseBody    
    @RequestMapping(value = "/request/isloggedin", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public boolean isLoggedin(HttpServletResponse httpServletResponse, HttpSession httpSession) throws JsonProcessingException {
        return httpSession.getAttribute(LOGIN_SESSION_NAME) != null;
    }
    
    @ResponseBody    
    @RequestMapping(value = "/request/logout", method = RequestMethod.GET)
    public void logout(HttpServletResponse httpServletResponse, HttpSession httpSession) throws JsonProcessingException {
        httpSession.invalidate();
    }
    
    @ResponseBody    
    @RequestMapping(value = "/request/profile", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Profile getProfile(HttpServletResponse httpServletResponse, HttpSession httpSession) throws JsonProcessingException {
        User user = (User)httpSession.getAttribute(LOGIN_SESSION_NAME);
        Profile profile = new Profile();
        if (user != null) {
            profile.setName(user.getName());
        }
        return profile;
    }  
}
