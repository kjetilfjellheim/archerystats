
package no.fd.archerystats.service;

import no.fd.archerystats.dao.UserDao;
import no.fd.archerystats.service.pojo.User;
import no.fd.archerystats.service.pojo.facebook.SocialToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Kjetil
 */
@Service
public class LoginServiceImpl implements LoginService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoginServiceImpl.class);       
    
    @Autowired
    private UserDao userDao;
    
    public User login(SocialToken socialToken) {
        LOGGER.info("Login process started.");
        boolean verified = verifyToken(socialToken);
        User result = null;
        if (verified) {
            LOGGER.info("Login access verified.");
            User existUser = userDao.findByFacebookId(socialToken.getId());
            if (existUser == null) {
                LOGGER.info("User did not already exist.");
                User user = new User();
                user.setName(socialToken.getName());                
                user.setFacebookid(socialToken.getId());
                userDao.create(user.getName(), user.getFacebookid());
                result = user;
            } else {
                LOGGER.info("User exist.");                        
                existUser.setName(socialToken.getName());
                userDao.update(existUser.getId(), existUser.getName(), existUser.getFacebookid());
                result = existUser;
            }
        } else {
            LOGGER.info("Login access not verified.");
        }
        return result;
    }

    private boolean verifyToken(SocialToken socialToken) {
        return true;
    }
    
}
