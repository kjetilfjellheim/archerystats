
package no.fd.archerystats.dao;

import java.util.List;
import javax.sql.DataSource;
import no.fd.archerystats.service.pojo.Bow;
import no.fd.archerystats.service.rowmapper.BowRowMapper;
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
public class JdbcBowDao implements BowDao {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(JdbcBowDao.class);       
    
    @Autowired
    private BowRowMapper bowRowMapper;
    
    private final JdbcTemplate jdbcTemplate;    
    
    @Autowired    
    public JdbcBowDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
    
    public List<Bow> findByUser(String idUser) {
        LOGGER.info("Find by user {}", idUser);
        return this.jdbcTemplate.query("select * from archerystats_v1.bow where id_user = ?", new Object[]{idUser}, bowRowMapper);
    }

    public Bow findByUserAndBowname(String idUser, String bowname) {
        LOGGER.info("Find by user and bowname {}", idUser, bowname);
        return this.jdbcTemplate.queryForObject("select * from archerystats_v1.bow where id_user = ? and bowname = ?", new Object[] { idUser, bowname }, bowRowMapper);
    }
    
}
