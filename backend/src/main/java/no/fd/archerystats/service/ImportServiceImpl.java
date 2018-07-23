
package no.fd.archerystats.service;

import java.util.List;
import no.fd.archerystats.dao.RoundDao;
import no.fd.archerystats.service.pojo.Round;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kjetil
 */
@Service
public class ImportServiceImpl implements ImportService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ImportServiceImpl.class);    
    
    @Autowired
    private RoundDao roundDao;
    
    @Transactional
    public void importData(List<Round> rounds) {
        LOGGER.info("Importing data");
        for (Round round : rounds) {
            roundDao.insert(round.getIdUser(), round.getIdBow(), round.getShootDate(), round.getRound(), round.getMissScored(), round.getPerfectScored(), round.getBadshotScored(), round.getMiss(), round.getPerfect(), round.getBadShots(), round.getDistance(), round.getHorizontalLeft(), round.getHorizontalCenter(), round.getHorizontalRight(), round.getVerticalHigh(), round.getVerticalCenter(), round.getVerticalLow());
        }
    }
    
}
