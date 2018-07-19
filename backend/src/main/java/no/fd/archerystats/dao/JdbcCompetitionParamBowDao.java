
package no.fd.archerystats.dao;

import java.util.List;
import javax.sql.DataSource;
import no.fd.archerystats.service.pojo.Bow;
import no.fd.archerystats.service.pojo.CompetitionParam;
import no.fd.archerystats.service.rowmapper.BowRowMapper;
import no.fd.archerystats.service.rowmapper.CompetitionParamRowMapper;
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
public class JdbcCompetitionParamBowDao implements CompetitionParamDao {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(JdbcCompetitionParamBowDao.class);       
    
    @Autowired
    private CompetitionParamRowMapper competitionParamRowMapper;
    
    private final JdbcTemplate jdbcTemplate;    
    
    @Autowired    
    public JdbcCompetitionParamBowDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
    
    public List<CompetitionParam> findAll() {
        LOGGER.info("Find all");
        return this.jdbcTemplate.query("select * from archerystats_v1.competition_param order by \"order\"", new Object[] { }, competitionParamRowMapper);        
    }
    
}
