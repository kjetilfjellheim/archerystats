
package no.fd.archerystats.dao;

import java.util.List;
import javax.sql.DataSource;
import no.fd.archerystats.service.pojo.Bow;
import no.fd.archerystats.service.rowmapper.BowRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kjetil
 */
@Repository
public class JdbcBowDao implements BowDao {

    @Autowired
    private BowRowMapper bowRowMapper;
    
    private final JdbcTemplate jdbcTemplate;    
    
    @Autowired    
    public JdbcBowDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
    
    public List<Bow> findByUser(String idUser) {
        return this.jdbcTemplate.query("select * from archerystats_v1.bow where id_user = ?", new Object[]{idUser}, bowRowMapper);
    }
    
}
