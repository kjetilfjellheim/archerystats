
package no.fd.archerystats.dao;

import java.util.List;
import javax.sql.DataSource;
import no.fd.archerystats.service.pojo.User;
import no.fd.archerystats.service.rowmapper.UserRowMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kjetil
 */
@Repository
public class JdbcUserDao implements UserDao {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(JdbcUserDao.class);   
    
    @Autowired
    private UserRowMapper userRowMapper;

    private final JdbcTemplate jdbcTemplate;    
    
    @Autowired    
    public JdbcUserDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }    
    
    public List<User> findAll() {
        LOGGER.info("Find all users");
        return this.jdbcTemplate.query("select * from archerystats_v1.user", userRowMapper);
    }

    public User findById(String userId) {
        LOGGER.info("Find user by id {}", userId);
        List<User> users = this.jdbcTemplate.query("select * from archerystats_v1.user where id = ?", new Object[] { userId }, userRowMapper);
        if (users.size() == 1) {
            return users.get(0);
        } else {
            return null;
        }
    }

    public User findByName(String name) {
        LOGGER.info("Find user by name {}", name);
        List<User> users = this.jdbcTemplate.query("select * from archerystats_v1.user where name = ?", new Object[] { name }, userRowMapper);
        if (users.size() == 1) {
            return users.get(0);
        } else {
            return null;
        }        
    }

    public User findByFacebookId(String facebookid) {
        LOGGER.info("Find user by facebookid {}", facebookid);
        List<User> users = this.jdbcTemplate.query("select * from archerystats_v1.user where facebookid = ?", new Object[] { facebookid }, userRowMapper);
        if (users.size() == 1) {
            return users.get(0);
        } else {
            return null;
        }        
    }

    public String create(String name, String facebookid) {
        String id = java.util.UUID.randomUUID().toString();
        this.jdbcTemplate.update("INSERT INTO archerystats_v1.user(id, name, facebookid) VALUES (?, ?, ?);", new Object[]{id, name, facebookid});
        return id;
    }

    public void update(String id, String name, String facebookid) {
        LOGGER.info("Updating user id {}", id);        
        this.jdbcTemplate.update("UPDATE archerystats_v1.user SET name = ?, facebookid = ? WHERE id = ?;", new Object[]{name, facebookid, id});
    }
    
}
