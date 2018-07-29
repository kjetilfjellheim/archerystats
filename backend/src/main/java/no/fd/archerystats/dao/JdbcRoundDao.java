package no.fd.archerystats.dao;

import java.util.Date;
import java.util.List;
import javax.sql.DataSource;
import no.fd.archerystats.service.pojo.Round;
import no.fd.archerystats.service.rowmapper.RoundRowMapper;
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
public class JdbcRoundDao implements RoundDao {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(JdbcRoundDao.class);   
    
    @Autowired
    private RoundRowMapper roundRowMapper;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcRoundDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public String insert(String idUser, String idBow, Date shootDate, Integer round, Boolean missScored, Boolean perfectScored, Boolean badshotScored, Integer miss, Integer perfect, Integer badShots, Integer distance, Integer horizontalLeft, Integer horizontalCenter, Integer horizontalRight, Integer verticalHigh, Integer verticalCenter, Integer verticalLow) {
        String id = java.util.UUID.randomUUID().toString();
        this.jdbcTemplate.update("INSERT INTO archerystats_v1.round(id, id_user, id_bow, shoot_date, round, miss_scored, perfect_scored, badshot_scored, miss, perfect, badshot, horizontal_left, horizontal_center, horizontal_right, vertical_high, vertical_center, vertical_low, distance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", new Object[]{id, idUser, idBow, shootDate, round, missScored, perfectScored, badshotScored, miss, perfect, badShots, horizontalLeft, horizontalCenter, horizontalRight, verticalHigh, verticalCenter, verticalLow, distance});
        return id;
    }

    public void delete(String idUser, String idBow, Date shootDate) {
        this.jdbcTemplate.update("delete from archerystats_v1.round where id_user = ? and id_bow = ? and shoot_date = ?", new Object[] {idUser, idBow, shootDate});
    }

    public List<Round> findRounds(String userid, Date fromDate, Date toDate, Integer mindistance, Integer maxdistance) {
        LOGGER.info("Find rounds");
        return this.jdbcTemplate.query("select * from archerystats_v1.round where id_user = ? and shoot_date >= ? and (shoot_date - interval '1 day') <= ? and distance >= ? and distance <= ? order by shoot_date", new Object[]{userid, fromDate, toDate, mindistance, maxdistance}, roundRowMapper);
    }

    public List<Round> findRoundsLastTraining(String userid, Integer mindistance, Integer maxdistance) {
        LOGGER.info("Find rounds");
        return this.jdbcTemplate.query("select * from archerystats_v1.round where id_user = ? and distance >= ? and distance <= ? and shoot_date = (select max(shoot_date) from archerystats_v1.round where id_user = ?) order by shoot_date", new Object[]{userid, mindistance, maxdistance, userid}, roundRowMapper);
    }

}
