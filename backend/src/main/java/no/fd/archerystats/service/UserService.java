
package no.fd.archerystats.service;

import java.util.List;
import java.util.Map;
import no.fd.archerystats.service.pojo.User;


/**
 *
 * @author kjetilf
 */
public interface UserService {

    List<User> getUsers();

    Map<String, Object> getUserInfo(String userId);
    
}
