
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
    
}
