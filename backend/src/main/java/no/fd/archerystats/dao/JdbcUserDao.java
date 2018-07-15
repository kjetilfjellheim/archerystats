
package no.fd.archerystats.dao;

import java.util.List;
import javax.sql.DataSource;
import no.fd.archerystats.service.pojo.User;
import no.fd.archerystats.service.rowmapper.UserRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kjetil
 */
@Repository
public class JdbcUserDao implements UserDao {

    @Autowired
    private UserRowMapper userRowMapper;

    private final JdbcTemplate jdbcTemplate;    
    
    @Autowired    
    public JdbcUserDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }    
    
    public List<User> findAll() {
        return this.jdbcTemplate.query("select * from archerystats_v1.user", userRowMapper);
    }

    public User findById(String userId) {
        return this.jdbcTemplate.queryForObject("select * from archerystats_v1.user", userRowMapper);
    }
    
}
