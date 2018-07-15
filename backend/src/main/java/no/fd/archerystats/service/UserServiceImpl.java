package no.fd.archerystats.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import no.fd.archerystats.dao.BowDao;
import no.fd.archerystats.dao.UserDao;
import no.fd.archerystats.service.pojo.User;
import org.apache.commons.configuration.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kjetilf
 */
@Service
public class UserServiceImpl extends AbstractService implements UserService {

    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserDao userDao;

    @Autowired
    private BowDao bowDao;    
    
    @Autowired
    private Configuration configuration;

    @Transactional
    public List<User> getUsers() {
        return userDao.findAll();
    }

    @Transactional
    public Map<String, Object> getUserInfo(String userId) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("user", userDao.findById(userId));
        result.put("bows", bowDao.findByUser(userId));
        return result;
    }


    
}
