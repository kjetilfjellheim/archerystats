
package no.fd.archerystats.dao;

import java.util.List;
import no.fd.archerystats.service.pojo.User;

/**
 *
 * @author Kjetil
 */
public interface UserDao {

    List<User> findAll();

    User findById(String userId);
    
    User findByName(String name);

    User findByFacebookId(String id);

    void update(String id, String name, String facebookid);

    String create(String name, String facebookid);
    
}
