package song.catalogue.common;
import org.springframework.beans.factory.annotation.Value;

public class AbstractRepository {

    @Value("${default_schema}")
    protected String schema;

}

