
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
        return this.jdbcTemplate.queryForObject("select * from archerystats_v1.user", userRowMapper);
    }

    public User findByName(String name) {
        LOGGER.info("Find user by name {}", name);
        return this.jdbcTemplate.queryForObject("select * from archerystats_v1.user where name = ?", new Object[] { name }, userRowMapper);
    }
    
}
