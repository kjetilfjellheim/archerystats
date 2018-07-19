
package no.fd.archerystats.dao;

import java.util.Date;
import java.util.List;
import javax.sql.DataSource;
import no.fd.archerystats.service.pojo.Bow;
import no.fd.archerystats.service.pojo.Competition;
import no.fd.archerystats.service.rowmapper.BowRowMapper;
import no.fd.archerystats.service.rowmapper.CompetitionRowMapper;
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
public class JdbcCompetitionDao implements CompetitionDao {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(JdbcCompetitionDao.class);       
    
    @Autowired
    private CompetitionRowMapper competitionRowMapper;
    
    private final JdbcTemplate jdbcTemplate;    
    
    @Autowired    
    public JdbcCompetitionDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Competition> findResults(String idParam, String idUser, Date fromDate, Date toDate, boolean training) {
        LOGGER.info("Find results {} {}", idParam, idUser);
        return this.jdbcTemplate.query("select * from archerystats_v1.competition where id_user = ? and id_param = ? and date >= ? and date <= ? and training = ?", new Object[] { idUser, idParam, fromDate, toDate, training }, competitionRowMapper);

    }
    
}
